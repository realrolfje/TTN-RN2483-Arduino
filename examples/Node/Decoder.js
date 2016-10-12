/**
 * Use as payload decoder function.
 *
 * 02 08 99
 * 
 * {
 *   "port": 2,
 *   "temperature": 22.01
 * }
 *
 * 01 12 8E 00 22 08 99
 * {
 *   "battery": 4750,
 *   "light": 34,
 *   "port": 1,
 *   "temperature": 22.01
 * }
 *
 * 
 */

function Decoder(bytes /*, port */ ) {
  var decoded = {};

  // Until PF support port we pass it as first byte
  decoded.port = bytes[0];
  bytes = bytes.slice(1);

  var PORT_DATA = 1;
  var PORT_ALERT = 2;
  var PORT_MOTION = 3;
  var PORT_BUTTON = 4;

  switch (decoded.port) {
    case PORT_DATA:
      decoded.battery = (bytes[0] << 8) + bytes[1];
      decoded.light = (bytes[2] << 8) + bytes[3];
      decoded.temperature = ((bytes[4] << 8) + bytes[5]) / 100;
      break;
    case PORT_ALERT:
      decoded.temperature = ((bytes[0] << 8) + bytes[1]) / 100;
      break;
    case PORT_MOTION:
    case PORT_BUTTON:
      decoded.duration = ((bytes[0] << 8) + bytes[1]) / 100;
      break;
  }

  return decoded;
}