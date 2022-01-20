import 'package:flutter/material.dart';
import './input.dart';

Column inputSection(
    {required String hintText,
    required IconData icon,
    required bool isSecure,
    required TextEditingController controller}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text(
        hintText,
        style: const TextStyle(
            color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
      ),
      const SizedBox(height: 10),
      Container(
          alignment: Alignment.center,
          height: 60,
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: const [
                BoxShadow(
                    color: Colors.black26, blurRadius: 6, offset: Offset(0, 2))
              ]),
          child: input(
              hintText: hintText,
              icon: icon,
              isSecure: isSecure,
              controller: controller))
    ],
  );
}
