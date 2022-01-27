import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../Common/color.dart';

GestureDetector tbutton({required Function onTap}) {
  return GestureDetector(
    onTap: () => {onTap()},
    child: Container(
      padding: const EdgeInsets.all(15.0),
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.white,
      ),
      child: const Icon(
        FontAwesomeIcons.twitter,
        color: CustomColor.darkBlue,
        // Color(0xFF0084ff)
      ),
    ),
  );
}
