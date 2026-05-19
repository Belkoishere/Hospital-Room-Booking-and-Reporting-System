import { RoomService } from "../Services/RoomService.js";

export class RoomContext {
  constructor(
    public readonly roomService: RoomService,
  ) {}
}
