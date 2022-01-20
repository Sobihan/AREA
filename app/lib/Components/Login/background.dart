import 'package:flutter/material.dart';

BoxDecoration background() {
  return const BoxDecoration(
      gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
        Color(0xA662AEFB),
        Color(0x9962AEFB),
        Color(0xCC62AEFB),
        Color(0xFF62AEFB)
      ]));
}
