import 'package:flutter/material.dart';
import '../Common/color.dart';

TextField input({required TextEditingController controller}) {
  return TextField(
    cursorColor: CustomColor.lightBlue,
    textAlign: TextAlign.center,
    controller: controller,
    style: const TextStyle(color: Colors.black87),
    decoration: const InputDecoration(
        fillColor: Colors.white,
        border: InputBorder.none,
        contentPadding: EdgeInsets.only(top: 14),
        hintStyle: TextStyle(color: Colors.black38)),
  );
}
