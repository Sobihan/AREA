import 'package:flutter/material.dart';
import './color.dart';

Container getMyHeader(String text) {
  return Container(
    height: 150.0,
    width: 500,
    margin: const EdgeInsets.only(top: 30, left: 7, right: 7, bottom: 7),
    decoration: const BoxDecoration(
      color: CustomColor.lightBlue,
      borderRadius: BorderRadius.all(Radius.circular(15)),
      shape: BoxShape.rectangle,
    ),
    child: Center(
        child: Text(text,
            style: const TextStyle(fontSize: 60, color: Colors.white),
            textAlign: TextAlign.center)),
  );
}
