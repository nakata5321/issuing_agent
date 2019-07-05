{ stdenv
, mkRosPackage
, robonomics_comm
}:

mkRosPackage rec {
  name = "${pname}-${version}";
  pname = "issuing-service-agent";
  version = "master";

  src = ./.;

  propagatedBuildInputs = [ robonomics_comm ];

  meta = with stdenv.lib; {
    description = "Issuing service agent for the renewable energy source";
    homepage = http://github.com/vourhey/sustainable-city-hack;
    license = licenses.bsd3;
    maintainers = with maintainers; [ vourhey ];
  };
}
