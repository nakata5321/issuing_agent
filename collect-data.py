#!/usr/bin/env python

from http.client import HTTPSConnection
from base64 import b64encode
from time import sleep

import signal
import psycopg2
import sys

connection = None


def catch_exit_signal(signum, frame):
    global connection
    print("Exiting...")
    if(connection):
        connection.close()
        print("PostgreSQL connection is closed")
    sys.exit()


def main():
    global connection
    try:
        # Put user name, password etc
        connection = psycopg2.connect(
            user="", password="", host="", port="", database="")
        cursor = connection.cursor()
        # Print PostgreSQL Connection properties
        print(connection.get_dsn_parameters(), "\n")
        # Print PostgreSQL version
        cursor.execute("SELECT version();")
        record = cursor.fetchone()
        print("You are connected to - ", record, "\n")

        cursor.execute(
            "CREATE TABLE IF NOT EXISTS solar (id serial PRIMARY KEY, measure TEXT);")
        connection.commit()
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        sys.exit()

    c = HTTPSConnection("rest01.alphaopen.com")
    userAndPass = b64encode(b"solar_user:eN8F8N4weA0e5").decode("ascii")
    headers = {'Authorization': 'Basic %s' % userAndPass}

    while True:
        print("getting data...")
        c.request('GET', '/api/v1/object/', headers=headers)
        # get the response back
        res = c.getresponse()
        # at this point you could check the status etc
        # this gets the page text
        data = res.read().decode("utf-8")

        print("Got it! {}...".format(data[:20]))

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO solar (measure) VALUES ('{}');".format(data))
        connection.commit()

        print("Waiting 60 sec")
        sleep(60)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, catch_exit_signal)
    main()
