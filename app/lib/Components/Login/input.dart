import 'package:flutter/material.dart';
import '../Common/color.dart';

TextField input(
    {required String hintText,
    required IconData icon,
    required bool isSecure,
    required TextEditingController controller}) {
  return TextField(
    cursorColor: CustomColor.lightBlue,
    controller: controller,
    keyboardType: isSecure == false ? TextInputType.emailAddress : null,
    obscureText: isSecure,
    style: const TextStyle(color: Colors.black87),
    decoration: InputDecoration(
        border: InputBorder.none,
        contentPadding: const EdgeInsets.only(top: 14),
        prefixIcon: Icon(icon, color: CustomColor.lightBlue),
        hintText: hintText,
        hintStyle: const TextStyle(color: Colors.black38)),
  );
}
