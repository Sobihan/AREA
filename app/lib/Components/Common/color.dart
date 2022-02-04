import 'package:flutter/material.dart';

class CustomColor {
  static const Color lightBlue = Color.fromRGBO(98, 174, 251, 1);
  static const Color grey = Color.fromRGBO(196, 196, 196, 0.34);
  static const Color whiteBlue = Color.fromRGBO(178, 226, 254, 1);
  static const Color white = Color(0xFFFFFFFF);
  static const Color darkBlue = Color.fromRGBO(34, 84, 224, 1);
  static const Color lightRed = Color.fromRGBO(255, 148, 148, 1);
  static const Color lightGreen = Color.fromRGBO(155, 232, 155, 1);
}

Map<int, Color> color = const {
  50: Color.fromRGBO(136, 14, 79, .1),
  100: Color.fromRGBO(136, 14, 79, .2),
  200: Color.fromRGBO(136, 14, 79, .3),
  300: Color.fromRGBO(136, 14, 79, .4),
  400: Color.fromRGBO(136, 14, 79, .5),
  500: Color.fromRGBO(136, 14, 79, .6),
  600: Color.fromRGBO(136, 14, 79, .7),
  700: Color.fromRGBO(136, 14, 79, .8),
  800: Color.fromRGBO(136, 14, 79, .9),
  900: Color.fromRGBO(136, 14, 79, 1),
};

int hexOfRGBA(int r, int g, int b, {double opacity = 1}) {
  var value = ((((opacity * 0xff ~/ 1) & 0xff) << 24) |
          ((r & 0xff) << 16) |
          ((g & 0xff) << 8) |
          ((b & 0xff) << 0)) &
      0xFFFFFFFF;
  return value;
}

List<int> colorPaletteIndices = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900
];

MaterialColor getMaterialColor(Color color) {
  List strengths = <double>[0.05];
  Map<int, Color> swatch = {};
  final int r = color.red, g = color.green, b = color.blue;

  for (int i = 1, len = 9; i <= len; i++) {
    strengths.add(0.1 * i);
  }

  strengths.forEach((strength) {
    final double ds = 0.5 - strength;
    swatch[(strength * 1000).round()] = Color.fromRGBO(
        r + ((ds < 0 ? r : (255 - r)) * ds).round(),
        g + ((ds < 0 ? g : (255 - g)) * ds).round(),
        b + ((ds < 0 ? b : (255 - b)) * ds).round(),
        1);
  });

  return MaterialColor(color.value, swatch);
}
