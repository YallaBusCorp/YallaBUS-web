import {AppointmentModule} from "../appointment/appointment.module";
import {BusModule} from "../bus/bus.module";
import {DriverModule} from "../employee/driver/driver.module";

export class RideModule {
  "id" : any | null;
  "appointment": AppointmentModule;
  "Bus": BusModule;
  "emp": DriverModule;
  "rideStatus": string;
  "rideData" : Date | any;
}
