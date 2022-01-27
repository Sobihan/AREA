import 'package:flutter/material.dart';

Row or() {
  return Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
              colors: <Color>[
                Colors.white10,
                Colors.white,
              ],
              begin: FractionalOffset(0.0, 0.0),
              end: FractionalOffset(1.0, 1.0),
              stops: <double>[0.0, 1.0],
              tileMode: TileMode.clamp),
        ),
        width: 100.0,
        height: 1.0,
      ),
      const Padding(
        padding: EdgeInsets.only(left: 15.0, right: 15.0),
        child: Text(
          'Or',
          style: TextStyle(
            color: Colors.white,
            fontSize: 16.0,
          ),
        ),
      ),
      Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
              colors: <Color>[
                Colors.white,
                Colors.white10,
              ],
              begin: FractionalOffset(0.0, 0.0),
              end: FractionalOffset(1.0, 1.0),
              stops: <double>[0.0, 1.0],
              tileMode: TileMode.clamp),
        ),
        width: 100.0,
        height: 1.0,
      ),
    ],
  );
}
