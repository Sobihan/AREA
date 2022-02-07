import 'package:flutter/material.dart';

Container rect(String name, Color? color, double width, double height) {
  return Container(
    alignment: Alignment.center,
    decoration: BoxDecoration(
        color: color, borderRadius: const BorderRadius.all(Radius.circular(5))),
    child: Text(name, style: const TextStyle(color: Colors.white)),
    height: height,
    width: width,
  );
}
