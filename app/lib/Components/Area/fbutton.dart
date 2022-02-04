import 'package:area/Components/Common/color.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

Align fbutton({required Function onPressed}) {
  return Align(
      alignment: FractionalOffset.bottomRight,
      child: Padding(
          padding: const EdgeInsets.only(bottom: 10, right: 5),
          child: FloatingActionButton(
            backgroundColor: Colors.white,
            child:
                const Icon(FontAwesomeIcons.plus, color: CustomColor.lightBlue),
            onPressed: () => {onPressed()},
          )));
}
