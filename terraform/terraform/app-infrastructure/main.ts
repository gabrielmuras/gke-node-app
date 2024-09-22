import { Construct } from "constructs";
import { App, TerraformStack, GcsBackend } from "cdktf";
import { GoogleProvider } from './.gen/providers/google/provider';

import { ComputeNetwork } from './.gen/providers/google/compute-network';
import { ComputeSubnetwork } from './.gen/providers/google/compute-subnetwork';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, 'Google', {
      project: 'case-sisu-tech',
      region: 'europe-north1', 
    });

    new GcsBackend(this, {
      bucket: 'tfstate-case-sisu-tech',
    });


    var mainVpc = new ComputeNetwork(this, 'main-vpc', {
      name: 'main-vpc',
      autoCreateSubnetworks: false,
    });
    
    new ComputeSubnetwork(this, 'subnet-01', {
      name: 'subnet-01',
      ipCidrRange: '10.0.1.0/24', 
      region: 'europe-north1', 
      network: mainVpc.id, 
    });
  }
}

const app = new App();
new MyStack(app, "app-infrastructure");
app.synth();
