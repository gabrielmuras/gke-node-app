import { Construct } from "constructs";
import { App, TerraformStack, GcsBackend } from "cdktf";
import { GoogleProvider } from './.gen/providers/google/provider';
import { ComputeNetwork } from './.gen/providers/google/compute-network';
import { ComputeSubnetwork } from './.gen/providers/google/compute-subnetwork';
import { ComputeFirewall } from './.gen/providers/google/compute-firewall';
import { ContainerCluster } from "./.gen/providers/google/container-cluster";
import { SqlDatabaseInstance } from "./.gen/providers/google/sql-database-instance";


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

    const mainVpc = new ComputeNetwork(this, 'main-vpc', {
      name: 'main-vpc',
      autoCreateSubnetworks: false,
    });
    
    const subnet01 = new ComputeSubnetwork(this, 'subnet-01', {
      name: 'subnet-01',
      ipCidrRange: '10.0.1.0/24', 
      region: 'europe-north1', 
      network: mainVpc.id, 
    });

    new ComputeFirewall(this, 'https-access', {
      name: 'allow-https',
      network: mainVpc.id,
      allow: [{
        protocol: 'tcp',
        ports: ['443'],
      }],
      sourceRanges: ['0.0.0.0/0'],
    });

    new ContainerCluster(this, 'gke-01', {
      name: 'gke-01',
      location: 'europe-north1',
      initialNodeCount: 1,
      subnetwork: subnet01.id,
      masterAuthorizedNetworksConfig: {
        cidrBlocks: [
          {
            cidrBlock: "10.26.32.12/32",
            displayName: "VPN Private",
          },
          {
            cidrBlock: "19.104.105.29/32",
            displayName: "VPN Public",
          },
        ],
      },
      nodeConfig: {
        machineType: 'e2-micro',
        oauthScopes: [
          'https://www.googleapis.com/auth/cloud-platform',
        ],
      },
      network: mainVpc.id,
    });

    new SqlDatabaseInstance(this, "postgresql-01", {
      name: "postgresql-01",
      databaseVersion: "POSTGRES_16",
      region:"europe-north1",
      settings:{
          tier: "db-f1-micro",
          ipConfiguration: {
            privateNetwork: mainVpc.id,
          },
      },
  });

  } 
}

const app = new App();
new MyStack(app, "app-infrastructure");
app.synth();
