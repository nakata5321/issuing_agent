{ stdenv
, mkRosPackage
, robonomics_comm
}:

mkRosPackage rec {
  name = "${pname}-${version}";
  pname = "collector-agent";
  version = "master";

  src = ./.;

  propagatedBuildInputs = [ robonomics_comm ];

  meta = with stdenv.lib; {
    description = "The second part of renewable energy agent";
    homepage = http://github.com/vourhey/collector-agent;
    license = licenses.bsd3;
    maintainers = with maintainers; [ vourhey ];
  };
}
