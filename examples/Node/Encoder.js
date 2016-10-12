function Encoder(object /*, port */ ) {
  var bytes = [];

  // Until PF support port we pass it as first byte
  var port = bytes[0] = object.port;

  var PORT_SET_DELAY = 1;
  var PORT_SET_ALERT = 2;

  switch (object.port) {
    case PORT_SET_DELAY:
      bytes.push((object.delay & 0xFF00) >> 8);
      bytes.push((object.delay & 0x00FF));
      break;
    case 2:
      bytes.push((object.enabled ? 1 : 0));

      bytes.push((object.lower & 0xFF00) >> 8);
      bytes.push((object.lower & 0x00FF));

      bytes.push((object.upper & 0xFF00) >> 8);
      bytes.push((object.upper & 0x00FF));

      bytes.push((object.critical & 0xFF00) >> 8);
      bytes.push((object.critical & 0x00FF));
      break;
  }

  return bytes;
}