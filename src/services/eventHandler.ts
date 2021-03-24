import { Event } from '../model/event';
import { produceMessage } from '../producer/producer';

export async function createEvent(
  eventType: string,
  eventMessage: string
): Promise<string> {
  let event = Event.create({ type: eventType, message: eventMessage });
  await produceMessage(eventMessage);
  event = await event.save();
  return event._id;
}
