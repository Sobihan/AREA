import 'package:flutter/material.dart';
import './Common/color.dart';

ThemeData getMyTheme() {
  return ThemeData(
    primarySwatch: getMaterialColor(const Color(0xffffffff)),
  );
}
