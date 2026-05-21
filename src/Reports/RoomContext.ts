import { RoomService } from "../Services/RoomService.js";

//Return reference to room service
export class RoomContext {
  constructor(
    public readonly roomService: RoomService,
  ) {}
}
