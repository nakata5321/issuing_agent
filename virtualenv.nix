with import <nixpkgs> {};

(python37.withPackages (ps: with ps; [ psycopg2 ])).env
