function Motorcycle(numWheels) {
    this.numWheels = numWheels;
    this.colorBody = "red";
}
Motorcycle.prototype.merk = "honda";

let myMotorcycle = new Motorcycle(2);
myMotorcycle.sound = 'knalpot';
let car = [];
let cycle = [];
for(let property in myMotorcycle){
    if(myMotorcycle.hasOwnProperty(property)) {
        car.push(property);
    }else{
        cycle.push(property)
    }
}
console.log(cycle)
console.log(car)