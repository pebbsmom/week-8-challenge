// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  // TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  async chooseVehicle(): Promise<void> {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then(async (answers: any) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        await this.performActions();
    });
  }

  // method to create a vehicle
  async createVehicle(): Promise<void> {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers: any) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        }
        if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        }
        if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
        // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type
      });
  }

  // method to create a car
  async createCar(): Promise<void> {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'wheels',
          message: 'Enter the wheel diameter and brand (comma separated, e.g., "diameter1,type1;diameter2,type2")',
        }
      ])
      .then(async (answers: any) => {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          answers.wheels.split(';').map((wheel: string) => {
            const [diameter,brand] = wheel.split(',');
            return new Wheel(parseInt(diameter), brand);
          })
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        await this.performActions();
      });
  }

  // method to create a truck
  async createTruck(): Promise<void> {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'wheels',
          message: 'Enter the wheel diameter and brand (comma separated, e.g., "diameter1,type1;diameter2,type2")',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
     
      ])
      .then(async (answers) => {
        // TODO: Use the answers object to pass the required properties to the Truck constructor
        // TODO: push the truck to the vehicles array
        // TODO: set the selectedVehicleVin to the vin of the truck
        // TODO: perform actions on the truck
      
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          answers.wheels.split(';').map((wheel: string) => {
            const [diameter,brand] = wheel.split(',');
            return new Wheel(parseInt(diameter), brand);
          }),
          parseInt(answers.towingCapacity)
        );
        // push the truck to the vehicles array 
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        await this.performActions();
      });
  }

  // method to create a motorbike
  async createMotorbike(): Promise<void> {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'wheels',
          message: 'Enter the wheel diameter and brand (comma separated, e.g., "diameter1,type1;diameter2,type2")',
        },
      ])
      .then(async (answers) => {
        // TODO: Use the answers object to pass the required properties to the Motorbike constructor
        // TODO: push the motorbike to the vehicles array
        // TODO: set the selectedVehicleVin to the vin of the motorbike
        // TODO: perform actions on the motorbike
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          answers.wheels.split(';').map((wheel: string) => {
            const [diameter, brand] = wheel.split(',');
            return new Wheel(parseInt(diameter), brand);
          })
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        // set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        await this.performActions();
      });
  }

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
   async findVehicleToTow(truck: Truck): Promise<void> {
     
     const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'vehicleToTow',
        message: 'Select a vehicle to tow',
        choices: this.vehicles?.map((vehicle: Car | Truck | Motorbike) => {
           return {
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          };
        }) 
      },
    ]).then(async (answers: any) => {
     /* console.log(answers.vehicleToTow); */
      const vehicleToTow = answers.vehicleToTow;
      /*console.log(vehicleToTow);*/
      if (vehicleToTow.vin === truck.vin) {
        console.log("The truck cannot tow itself.");
        await this.performActions();
      
      } else {
        console.log('I am a truck, I can tow');
        truck.tow(vehicleToTow);
        await this.performActions();
  
      }
      
    });
  
  }

  // method to perform actions on a vehicle
  async performActions(): Promise<void> {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: '',
          // TODO: add options to tow and wheelie
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Wheelie',
            'Tow',
            'Exit',
          ],
        },
      ])
      .then(async (answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
            }
          }
          
        }else if (answers.action === 'Tow' ) {
       
          let truck: Truck| undefined   
           for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] instanceof Truck) {
              truck = this.vehicles[i] as Truck;
            }
          } 
          if (truck) {
            console.log("The selected vehicle is a truck");
            await this.findVehicleToTow(truck);
            return; 
          } else {
            console.log("The selected vehicle is not a truck");
          } 
          
          
       
    
        
        } else if (answers.action === 'Wheelie' && this.selectedVehicleVin) {
            const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            }else{
              console.log("The selected vehicle is not a motorbike");
              
            } 
          }
          else if (answers.action === 'Select or create another vehicle') {
            // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          await this.performActions();
        }
      });
    }
  

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then(async (answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          await this.createVehicle();
        } else {
          await this.chooseVehicle();
        }
      });

    }
  }
// export the Cli class
export default Cli;
