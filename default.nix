{ pkgs ? import <nixpkgs> { }
, stdenv
, mkRosPackage
, robonomics_comm
}:

mkRosPackage rec {
  name = "${pname}-${version}";
  pname = "issuing_service_agent";
  version = "master";

  src = ./.;

  propagatedBuildInputs = [ robonomics_comm pkgs.python37Packages.web3 ];

  meta = with stdenv.lib; {
    description = "Issuing service agent for the renewable energy source";
    homepage = http://github.com/DAO-IPCI/issuing-service-package;
    license = licenses.bsd3;
    maintainers = with maintainers; [ vourhey ];
  };
}
