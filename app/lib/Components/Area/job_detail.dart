import 'package:area/Components/Common/color.dart';
import 'package:area/Models/area.dart';
import 'package:flutter/material.dart';

//ignore: must_be_immutable
class Detail extends StatefulWidget {
  final String host;
  Area area;
  Detail({Key? key, required this.host, required this.area}) : super(key: key);
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
  late Area cpy;
  List<String> actionList = [];
  List<String> reactionList = [];
  @override
  void initState() {
    cpy = widget.area.copy();
    super.initState();
    for (int i = 0; i < widget.area.action.config.length; i += 1) {
      String key = widget.area.action.config[i]["key"];
      actionList.add(key);
    }
    for (int i = 0; i < widget.area.reaction.config.length; i += 1) {
      String key = widget.area.reaction.config[i]["key"];
      reactionList.add(key);
    }
  }

  List<String> getActionsConfig() {
    // print(widget.area.action.config);
    List<String> data = [];
    for (int i = 0; i < actionConfig; i += 1) {
      // print("ici");
      // print(widget.area.action.config[i]["key"]);
      // print("ici");
      String key = widget.area.action.config[i].keys.toList()[0];
      data.add(key);
    }
    return data;
  }

  List<String> getReactionConfig() {
    List<String> data = [];
    for (int i = 0; i < reactionConfig; i += 1) {
      String key = widget.area.reaction.config[i].keys.toList()[0];
      data.add(key);
    }
    return data;
  }

  void cleanData() {
    print(widget.area.toString());
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

  void saveConfigAction(int index) {
    List<String> config = actionList;
    // print("dans saveconfig");
    // print(config);
    // print("dehors saveconfig");
    // print("haut");
    // print(config);
    // print("bas");
    if (controllersAction[index].text.isEmpty) return;
    widget.area.action.config[index] = {
      config[index]: controllersAction[index].text
    };
  }

  void saveConfigReaction(int index) {
    List<String> config = reactionList;
    if (controllersReaction[index].text.isEmpty) return;
    widget.area.reaction.config[index] = {
      config[index]: controllersReaction[index].text
    };
  }

  void getData() {
    cleanData();
    actionConfig = widget.area.action.config.length;
    reactionConfig = widget.area.reaction.config.length;
    for (int i = 0; i < actionConfig; i += 1) {
      String key = widget.area.action.config[i]["value"];
      controllersAction.add(TextEditingController(text: key));
      controllersAction[i].addListener(() => saveConfigAction(i));
      inputsAction.add(TextField(
          controller: controllersAction[i],
          style: const TextStyle(color: Colors.white)));
    }
    for (int i = 0; i < reactionConfig; i += 1) {
      String key = widget.area.reaction.config[i]["value"];
      controllersReaction.add(TextEditingController(text: key));
      controllersReaction[i].addListener(() => saveConfigReaction(i));
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
              Navigator.pop(context, widget.area);
            },
            child: const Text("Save",
                style: TextStyle(
                  color: Colors.black,
                ))),
        TextButton(
            onPressed: () {
              Navigator.pop(context, null);
            },
            child: const Text("Close",
                style: TextStyle(
                  color: Colors.black,
                ))),
      ],
    );
  }
}
