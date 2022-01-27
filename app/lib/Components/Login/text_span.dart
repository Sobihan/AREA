import 'package:flutter/material.dart';

GestureDetector textSpan(
    {required String description,
    required String name,
    required Function onTap}) {
  return GestureDetector(
    onTap: () => {onTap()},
    child: RichText(
      text: TextSpan(children: [
        TextSpan(
            text: description,
            style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w500)),
        TextSpan(
            text: name,
            style: const TextStyle(
                color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold))
      ]),
    ),
  );
}
