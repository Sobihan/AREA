import 'package:area/Components/Login/background.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';

class AreaPage extends StatefulWidget {
  final String host;
  final User user;

  const AreaPage({Key? key, required this.host, required this.user})
      : super(key: key);
  @override
  State<AreaPage> createState() => _AreaPageState();
}

class _AreaPageState extends State<AreaPage> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        child: Stack(children: <Widget>[
      Container(
          height: double.infinity,
          width: double.infinity,
          decoration: background(),
          child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(
                horizontal: 25,
                vertical: 120,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [Text("Area Page")],
              )))
    ]));
  }
}
