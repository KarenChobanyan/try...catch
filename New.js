"use strict"


class CarError extends Error {
    constructor(message, name) {
        super()
        this.message = message
        this.name = name
    }
};

class TruckError extends Error {
    constructor(message, name) {
        super()
        this.message = message
        this.name = name
    }
};

class CartError extends Error {
    constructor(message) {
        super()
        this.message = message
    }
}


class Vehicle {
    _speed = null
    _engineVolume = null
    #maxSpeed = 280
    #safety = null
    constructor(type, engineExists, seatPleace) {
        this.type = type
        this.engineExists = engineExists
        this.seatPleace = seatPleace
    }
    checkSpeed(speed) {
        if (speed > this.#maxSpeed) {
            this._speed = this.#maxSpeed
            throw new CarError("Tihs speed is too high")
        } else {
            return this._speed = speed
        }
    }
    checkEngineVolume(value) {
        if (this.engineExists == true) {
            this._engineVolume = value
        } else {
            this._engineVolume = null
            throw new CarError("The engine does not exist")
        }
    }
    checkSafety() {
        if (this.engineExists !== true) {
            this.#safety = "High"
        } else if (this._speed <= 160) {
            this.#safety = "Medium"
        } else {
            throw new CarError("Too risky")
        }
    }
    set speed(value) {
        this._speed = value
    }
    get speed() {
        try {
            this.checkSpeed(this._speed)
        } catch (err) {
            console.log(err);
        } return this._speed
    }
    set engineVolume(value) {
        this._enginevolume = value
    }
    get engineVolume() {
        try {
            this.checkEngineVolume(this._engineVolume)
        } catch (err) {
            console.log(err);
        } return this._engineVolume
    }
    get safety() {
        try {
            this.checkSafety()
        } catch (err) {
            console.log(err);
        } return this.#safety
    }
}
const carNames = ["mercedes", "bmw", "toyota", "lexus", "hyundai", "subaru", "lada", "ford", "honda", "chevrolet"]
class Car extends Vehicle {
    _model = null
    _year = null
    #airBag = null
    constructor(name, color) {
        super("Car", true, 5)
        this.name = name
        this.color = color
    }
    checkCarModel(model) {
        if (carNames.includes(this.name.toLowerCase())) {
            this._model = model
        } else {
            throw new CarError(this.name + " does not exist" + " " + carNames)
        }
    }
    checkYear(year) {
        if (year < 2003) {
            throw new CarError("This car is too old", this.name + " " + this._year)
        } else {
            this._year = year
        }
    }
    checkAirBag() {
        if (this._year < 1992 || this.name == "lada") {
            this.#airBag = false
            throw new CarError("This car does not have airbags.Be careful", this.name + " " + this._year)
        } else {
            this.#airBag = true
        }
    }
    set model(value) {
        this._model = value
    }
    get model() {
        try {
            this.checkCarModel(this._model)
        } catch (err) {
            console.log(err);
        } return this._model
    }
    set year(value) {
        this._year = value
    }
    get year() {
        try {
            this.checkYear(this._year)
        } catch (error) {
            console.error(error.message, error.name);
        } return this._year
    }
    get airBag() {
        try {
            this.checkAirBag()
        } catch (error) {
            console.error(error.message, error.name);
        }
        return this.#airBag
    }
    toString() {
        return this.type + " " + this.name + " " + this.model + ", color: " + this.color + ", year: " + this.year + ", airbag: " + this.airBag
    }
}

class Truck extends Vehicle {
    _liftgate = null
    _reefer = null
    #maxScale = null
    constructor(name, treilerSize) {
        super("Truck", true, 3)
        this.name = name
        this.treilerSize = treilerSize
    }
    checkReeferExists() {
        if (this._reefer == true) {
            return this._reefer
        } else {
            this._reefer = "Does not have"
            throw new TruckError("This field must be true or false. No other values ​​are allowed ", "Reefer")
        }
    }
    checkLiftGate() {
        if (this._liftgate == true) {
            return this._liftgate
        } else {
            this._liftgate = "Does not have"
            throw new TruckError("This field must be true or false. No other values ​​are allowed ", "Liftgate")
        }
    }
    checkMaxscale() {
        if (this.treilerSize == 53) {
            this.#maxScale = 45000
        }
        else if (this.treilerSize == 48) {
            this.#maxScale = 40000
        }
        else if (this.treilerSize == 26) {
            this.#maxScale = 20000
        }
        else {
            throw new TruckError("The trailer size does not exist", "Please select a trailer from the list [26,48,53]")
        }
    }
    set reefer(value) {
        this._reefer = value
    }
    get reefer() {
        try {
            this.checkReeferExists()
        } catch (error) {
            console.error(error.name, error.message,);
        }
        return this._reefer
    }
    get liftGate() {
        try {
            this.checkLiftGate()
        } catch (error) {
            console.error(error.name, error.message)
        }
    }
    get maxScale() {
        try {
            this.checkMaxscale()
        } catch (error) {
            console.error(error.message, error.name,)

        }
        return this.#maxScale
    }

    toString() {
        return this.name + " " + this.treilerSize + "feet" + ", Refrigirator: " + this.reefer + ", Liftgate:" + this.liftGate + ", Max scale: " + this.maxScale + "lbs"
    }
}

class Cart extends Vehicle {
    _pullerCount = null
    #travelSeat = null
    #maxDistance = null
    constructor(weelsCount, pullerType) {
        super("Cart", false)
        this.weelsCount = weelsCount
        this.pullerType = pullerType
    }
    set pullerCount(value) {
        this._pullerCount = value
    }
    get pullerCount() {
        return this._pullerCount
    }
    CheckTravelSeat() {
        if (this.pullerCount > 1) {
            this.#travelSeat = true
        } else {
            this.#travelSeat = false
            throw new CartError("In order to have a travel seat the cart must have at least 2 pullers")
        }
    }
    checkMaxDistance() {
        if (this._pullerCount > 1) {
            for (let i = 1; i <= this._pullerCount; i++) {
                this.#maxDistance += 60
            } return this.#maxDistance
        } else {
            this.#maxDistance = 60
            throw new CartError("The more pullers your cart has,the longer distance it can travel")
        }
    }
    get travelSeat() {
        try {
            this.CheckTravelSeat()
        } catch (error) {
            console.error(error.message)
        }
        return this.#travelSeat
    }
    get maxDistance() {
        try {
            this.checkMaxDistance()
        } catch (error) {
            console.error(error.message)
        }
        return this.#maxDistance
    }

    toString() {
        return this.type + ", Pulling by: " + this.pullerType + ", Pullers: " + this.pullerCount + ", Travel seat: " + this.travelSeat + ", Max distance: " + this.maxDistance
    }
}

let car1 = new Car("BMW", "black")
car1.speed = 500
car1.engineVolume = 2.5
car1.model = "7 seria"
car1.year = 1990
console.log(car1.toString());
let truck1 = new Truck("Volvo", 53)
truck1.reefer = 15
truck1.treilerSize = 55
console.log(truck1.toString());
let cart1 = new Cart(4, "horses")
cart1.pullerCount = 1
console.log(cart1.toString());



//unfinished...


/*class CarError extends Error {
   constructor(message) {
       super()
       this.message = message
   }
};
const setCarPrice = function(year,price){
   if(year<2003){
     return new CarError("This car is too old")   ///
   }else{
       let startPrice = price
       for(let i = 2005;i <= year;i++){
           startPrice += 0.1 * price
       } return startPrice
   }
}
const carNames = new Map()
carNames.set("mercedes", [
   {
       setHorsePower(engineVolume) {
           let counter
           switch (engineVolume) {
               case 1.3:
                   counter = 136;
                   break;
               case 2:
                   counter = 190;
                   break;
               case "2d":
                   counter = 150
                   break;
               default:
                   counter = "Can not find this engine"

           }
           return this.horsePower = counter
       },
       
       model: "a-class",
       enginePower: [1.3, 2, "2.3d"],
       engineVolume: 0,
       hosePower: 0,
       year:2005,
       price:3500,

   },
   {
       model: "b-class"
   },
   {
       model: "c-class"
   },
   {
       model: "e-class"
   },
   {
       model: "s-class"
   },
   {
       model: "g-class"
   },
   {
       model: "gl-class"
   },
   {
       model: "ml-class"
   }])
class Vehicle {
   //price = undefined
   name = undefined
   year = undefined
   //_model = null
   
   #horsePower = null
   #fuelType = null
   #maxSpeed = null

   
   get maxSpeed() {
       return this._maxSpeed
   }
   set engineVolume(value) {
       this._engineVolume = value
   }
   get engineVolume() {
       return this._engineVolume
   }


   defineHorsePower() {
       return this.#horsePower
   }
   get fuelType() {
       return this.#fuelType
   }
}

class Car extends Vehicle {
   type = null
   color = null
   engineVolume = null
   _model = null
   _mileage = null
   #horsePower = null
   #price = null

   set mileage(value) {
       this._mileage = value
   }
   get mileage() {
       return this._mileage
   }
   set model(value) {
       this._model = value
   }


   get model() {
       return this._model
   }
   checkCarName() {
       if (carNames.has(this.name.toLowerCase())) {
           return this.name
       } else {
           throw new Error("This car does not exist")
       }
   }
   checkCarModel() {
       this.model = this.model.toLowerCase()
       if (carNames.get(this.name).includes(carNames.get(this.name).find(el => el.model == this.model))) {
           return this.model
       } else if (carNames.get(this.name).includes(carNames.get(this.name).find(el => el.model.startsWith(this.model[0])))) {
           console.log(carNames.get(this.name).includes(carNames.get(this.name).find(el => el.model.startsWith(this.model[0]))));
           let exactObjetc = carNames.get(this.name).filter(el => el.model.startsWith(this.model[0]))[0]
           console.log(exactObjetc);
           return this.model = exactObjetc.model 
       } else {
           throw new Error("Model does not exist")
       }
   }

   checkEngine() {
       let exactObjetc = carNames.get(this.name).filter(el => el.model.startsWith(this.model[0]))[0]
       if (exactObjetc.enginePower.includes(this.engineVolume)) {
           exactObjetc.engineVolume = this.engineVolume
           console.log(exactObjetc.engineVolume);
           this.#horsePower = exactObjetc.setHorsePower(exactObjetc.engineVolume)
           this.#price = exactObjetc.price
       }
       else {
           throw new CarError(this.name + " " + this.model + " does not have this type of engine")
       }
     
   }
   toString() {
       try {
           this.checkCarName()
       } catch (error) {
           console.log(error, carNames.keys());
       }
       try {
           this.checkCarModel()
       } catch (error) {
           console.log(error, carNames.get(this.name));
       }
       try {
           this.checkEngine()
       } catch (error) {
           console.log(error.name, error.message, "\n", "Select an engine that is in the list:", "\n", carNames.get(this.name).filter(el => el.model.startsWith(this.model[0]))[0].enginePower);
       }

       this.#price = setCarPrice(this.year,this.#price)
       
       return this.constructor.name + " " + this.name.toUpperCase() + ", model: " + this.model + ", year: " + this.year + ", Engine: " + this.engineVolume + " Horse Power: " + this.#horsePower+ " Price: " + this.#price;
   }


}

class Truck extends Vehicle {
   trailerExists = Boolean
   refrigirator = Boolean
   _trailerSize = null
   #maxScale = null


   set trailerSize(value) {
       this._trailerSize = value
   }
   get maxScale() {
       return this._trailerSize
   }
   set model(value) {
       this._model = value
   }
   set enginePower(value) {
       this._enginePower = value
   }
   set horsePower(value) {
       this._horsePower = value
   }
}

class Cart extends Vehicle {
   passengerSeat = null
   pullerType = null
   _pullersCount = null
   #maxDistance = null

   set pullersCount(value) {
       this._pullersCount = value
   }
   get pullersCount() {
       return this._pullersCount
   }

   fn() {
       if (isNaN(this.passengerSeat)) {
           this.passengerSeat = 0
           throw new Error()
       }
   }
   toString() {
       try {
           this.fn()
       } catch (err) {
           console.log("must be a number");
       } return this.passengerSeat + " " + this.pullerType
   }

}


let car = new Car()
car.name = "mercedes"
car.model = "a -class"
car.year = 2005
car.engineVolume = 2
console.log(car.toString());



*/