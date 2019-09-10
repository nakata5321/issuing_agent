import rospy
from robonomics_msgs.msg import Result

def sign_result(res):
    pub = rospy.Publisher("/liability/infochan/eth/signing/result", Result, queue_size=128)

    r = Result()
    r.result = res.result
    r.liability = res.liability
    r.success = res.success

    rospy.sleep(2)
    rospy.loginfo(r)

    pub.publish(r)


if __name__ == "__main__":
    rospy.init_node("validator_tester")

    rospy.Subscriber("/liability/infochan/incoming/result", Result, sign_result)

    rospy.spin()

