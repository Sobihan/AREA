import 'package:flutter/material.dart';
import './input.dart';

Container inputSection({required TextEditingController controller}) {
  return Container(
      alignment: Alignment.center,
      height: 50,
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: const [
            BoxShadow(
                color: Colors.black26, blurRadius: 6, offset: Offset(0, 2))
          ]),
      child: input(controller: controller));
}
