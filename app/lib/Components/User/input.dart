import 'package:flutter/material.dart';
import '../Common/color.dart';

TextField input(
    {required bool isSecure, required TextEditingController controller}) {
  return TextField(
    cursorColor: CustomColor.lightBlue,
    controller: controller,
    keyboardType: isSecure == false ? TextInputType.emailAddress : null,
    obscureText: isSecure,
    style: const TextStyle(color: Colors.black87),
    decoration: const InputDecoration(
        border: InputBorder.none,
        contentPadding: EdgeInsets.only(top: 14),
        hintStyle: TextStyle(color: Colors.black38)),
  );
}
