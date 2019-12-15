cmake_minimum_required(VERSION 2.8.3)
project(issuing_service_agent)

find_package(catkin REQUIRED COMPONENTS
  rospy
)

catkin_python_setup()

catkin_package()

catkin_install_python(
    PROGRAMS
        scripts/issuer_node
		scripts/checker_node
    DESTINATION
        ${CATKIN_PACKAGE_BIN_DESTINATION}
)

install(
    FILES
        launch/issuer.launch
    DESTINATION
        ${CATKIN_PACKAGE_SHARE_DESTINATION}/launch
)

install(
    FILES
       abi/EnergyTokenByzantium.json
       abi/EnergyTokenPetersburg.json
    DESTINATION
        ${CATKIN_PACKAGE_SHARE_DESTINATION}/abi
)

