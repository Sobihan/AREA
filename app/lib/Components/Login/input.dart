import 'package:flutter/material.dart';
import '../Common/color.dart';

Container getMyInput(TextEditingController controller, IconData icon,
    String placehold, bool isSecret) {
  return Container(
      margin: const EdgeInsets.only(left: 7, right: 7),
      child: TextField(
          obscureText: isSecret,
          controller: controller,
          showCursor: false,
          textAlign: TextAlign.center,
          decoration: InputDecoration(
              focusedBorder: OutlineInputBorder(
                borderSide:
                    const BorderSide(color: CustomColor.lightBlue, width: 2.0),
                borderRadius: BorderRadius.circular(25.0),
              ),
              fillColor: CustomColor.grey,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(
                  width: 0,
                  style: BorderStyle.none,
                ),
              ),
              filled: true,
              hintText: placehold,
              prefixIcon: Icon(
                icon,
                color: CustomColor.lightBlue,
              ))));
}
