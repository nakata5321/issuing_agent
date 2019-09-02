import rosbag
from std_msgs.msg import String

bag = rosbag.Bag("objective.bag", "w")

# QmevVxGMRbLgv6grkQxYYSy4NzYnkpojm48QD7ag15uaok - ipfs hash of log file
bag.write("/log", String("QmevVxGMRbLgv6grkQxYYSy4NzYnkpojm48QD7ag15uaok"))
bag.close()

