import 'package:area/Components/Area/dismiss.dart';
import 'package:area/Components/Area/fbutton.dart';
import 'package:area/Components/Area/new_area.dart';
import 'package:area/Components/Common/color.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Models/area.dart';
import 'package:area/Models/reaction_list.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';
import 'package:area/Components/Area/job.dart';
import 'package:area/Models/action_list.dart';

class AreaPage extends StatefulWidget {
  final String host;
  final User user;
  final dynamic actionReaction;

  const AreaPage(
      {Key? key,
      required this.host,
      required this.user,
      required this.actionReaction})
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
      "interval": "15",
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

  void newArea() async {
    var actions = actionFromJson(widget.actionReaction);
    var reactions = reactionFromJson(widget.actionReaction);
    var result = await showGeneralDialog(
        context: context,
        pageBuilder: (BuildContext context, Animation animation,
            Animation secondAnimation) {
          return Center(
              child: Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            color: CustomColor.lightBlue,
            child: Scaffold(
                body: Container(
                    decoration: background(),
                    child: NewArea(
                      host: widget.host,
                      actions: actions,
                      reactions: reactions,
                    ))),
          ));
        });
    print(result);
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
      fbutton(onPressed: () => newArea())
    ]));
  }
}
