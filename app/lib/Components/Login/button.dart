import 'package:area/Components/Common/color.dart';
import 'package:flutter/material.dart';

Container button({required String name, required Function onPressed}) {
  return Container(
    padding: const EdgeInsets.symmetric(vertical: 25),
    width: double.infinity,
    child: ElevatedButton(
        style: ElevatedButton.styleFrom(
            elevation: 5,
            padding: const EdgeInsets.all(15),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15))),
        onPressed: () => {onPressed()},
        child: Text(
          name,
          style: const TextStyle(
              color: CustomColor.lightBlue,
              fontSize: 18,
              fontWeight: FontWeight.bold),
        )),
  );
}
