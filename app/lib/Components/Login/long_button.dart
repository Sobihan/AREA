import 'package:flutter/material.dart';

Container getMyLongButton(String text, Function onPressed, Color customColor) {
  return Container(
      height: 80,
      width: 500,
      margin: const EdgeInsets.only(left: 7, right: 7),
      child: ElevatedButton(
          onPressed: () => {onPressed()},
          child: Text(text),
          style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(customColor))));
}
