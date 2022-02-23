import 'package:area/Components/Common/color.dart';
import 'package:area/Models/area.dart';
import 'package:flutter/material.dart';

class Detail extends StatefulWidget {
  final String host;
  final Area area;
  const Detail({Key? key, required this.host, required this.area})
      : super(key: key);
  @override
  State<Detail> createState() => _DetailState();
}

class _DetailState extends State<Detail> {
  late int actionConfig;
  late int reactionConfig;
  List<TextEditingController> controllersAction = [];
  List<Widget> inputsAction = [];
  List<TextEditingController> controllersReaction = [];
  List<Widget> inputsReaction = [];

  void cleanData() {
    int sizeAction = controllersAction.length;
    int sizeReaction = controllersReaction.length;
    if (sizeAction == 0 && sizeReaction == 0) return;
    for (int i = 0; i < sizeAction; i += 1) {
      controllersAction[i].dispose();
    }
    for (int i = 0; i < sizeReaction; i += 1) {
      controllersReaction[i].dispose();
    }
    controllersAction = [];
    controllersReaction = [];
    inputsAction = [];
    inputsReaction = [];
  }

  void getData() {
    cleanData();
    actionConfig = widget.area.action.config.length;
    reactionConfig = widget.area.reaction.config.length;
    for (int i = 0; i < actionConfig; i += 1) {
      String key = widget.area.action.config[i].keys.toList()[0];
      controllersAction
          .add(TextEditingController(text: widget.area.action.config[i][key]));
      inputsAction.add(TextField(
          controller: controllersAction[i],
          style: const TextStyle(color: Colors.white)));
    }
    for (int i = 0; i < reactionConfig; i += 1) {
      String key = widget.area.reaction.config[i].keys.toList()[0];
      controllersReaction.add(
          TextEditingController(text: widget.area.reaction.config[i][key]));
      inputsReaction.add(TextField(
        controller: controllersReaction[i],
        style: const TextStyle(color: Colors.white),
      ));
    }
  }

  Container wrap(List<Widget> widgets) {
    return Container(
        decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3)),
            ],
            color: CustomColor.lightBlue,
            borderRadius: const BorderRadius.all(Radius.circular(5))),
        height: 150,
        child: SingleChildScrollView(
            child: Column(
          children: widgets,
        )));
  }

  List<Widget> buildActions() {
    getData();
    List<Widget> actionSections = [
      Text(
        widget.area.action.name,
        style:
            const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
      ),
    ];
    for (int i = 0; i < actionConfig; i += 1) {
      String key = widget.area.action.config[i]["key"];
      if (key == "userToken") continue;
      actionSections.add(Text(key));
      actionSections.add(inputsAction[i]);
    }
    List<Widget> reactionSection = [
      Text(
        widget.area.reaction.name,
        style:
            const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
      )
    ];
    for (int i = 0; i < reactionConfig; i += 1) {
      String key = widget.area.reaction.config[i]["key"];
      if (key == "userToken") continue;
      reactionSection.add(Text(key));
      reactionSection.add(inputsReaction[i]);
    }
    return [
      wrap(actionSections),
      const SizedBox(height: 50),
      wrap(reactionSection)
    ];
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Center(child: Text(widget.area.name)),
      content: Container(
          alignment: Alignment.topLeft,
          height: 400,
          child: SingleChildScrollView(
              child: Column(
            children: buildActions(),
          ))),
      actions: [
        TextButton(
            onPressed: () {
              Navigator.pop(context, "close");
            },
            child: const Text("Close",
                style: TextStyle(
                  color: Colors.black,
                )))
      ],
    );
  }
}
