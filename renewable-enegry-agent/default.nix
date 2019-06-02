{ stdenv
, mkRosPackage
, robonomics_comm
}:

mkRosPackage rec {
  name = "${pname}-${version}";
  pname = "renewable-enegry-agent";
  version = "master";

  src = ./.;

  propagatedBuildInputs = [ robonomics_comm ];

  meta = with stdenv.lib; {
    description = "Renewable enegery source agent for Sustainable Hackaton";
    homepage = http://github.com/vourhey/sustainable-city-hack;
    license = licenses.bsd3;
    maintainers = with maintainers; [ vourhey ];
  };
}
