import 'package:area/Components/Area/dismiss.dart';
import 'package:area/Components/Area/fbutton.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Models/area.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';
import 'package:area/Components/Area/job.dart';

class AreaPage extends StatefulWidget {
  final String host;
  final User user;

  const AreaPage({Key? key, required this.host, required this.user})
      : super(key: key);
  @override
  State<AreaPage> createState() => _AreaPageState();
}

class _AreaPageState extends State<AreaPage> {
  late Area area;

  @override
  void initState() {
    super.initState();
    Map<String, dynamic> data = {
      "name": "Area Name",
      "interval": 15,
      "action": {
        "name": "Action Name",
        "config": [
          {"set1": "settings"},
          {"set2": "null"}
        ]
      },
      "reaction": {
        "name": "Reaction Name",
        "config": [
          {"set3": "settings"},
          {"set4": "null"}
        ]
      }
    };
    area = Area.fromJson(json: data);
  }

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
                children: [
                  dismiss(
                      widget: Job(host: widget.host, area: area),
                      onDismissed: () => print("hello")),
                ],
              ))),
      fbutton(onPressed: () => print("Button Pressed"))
    ]));
  }
}
