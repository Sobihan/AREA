import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:area/Models/reaction.dart';
import 'package:area/Components/Area/input_section.dart';

//ignore: must_be_immutable
class NewReaction extends StatefulWidget {
  final List<Map<String, dynamic>> reactions;
  Reaction reaction =
      Reaction(name: "", config: ["empty", "empty", "empty", "empty", "empty"]);
  NewReaction({Key? key, required this.reactions}) : super(key: key);

  @override
  _NewReactionState createState() => _NewReactionState();
}

class _NewReactionState extends State<NewReaction> {
  List<String> reactionNames = [];
  String currentreaction = "";
  List<TextEditingController> controllers = [];
  List<Container> inputs = [];
  List<String> configName = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < widget.reactions.length; i += 1) {
      reactionNames.add(widget.reactions[i]["ReactionName"]);
    }
    currentreaction = reactionNames[0];
    for (int i = 0; i < 5; i += 1) {
      controllers.add(TextEditingController());
      inputs.add(inputSection(controller: controllers[i]));
      controllers[i].addListener(() => saveConfig(i));
    }
    widget.reaction.name = currentreaction;
  }

  void clean() {
    for (int i = 0; i < 5; i += 1) {
      controllers[i].clear();
    }
  }

  List<String> getConfigName() {
    List<String> configName = [];
    for (int i = 0; i < widget.reactions.length; i += 1) {
      if (widget.reactions[i]["ReactionName"] == currentreaction) {
        for (int j = 0; j < widget.reactions[i]["config"].length; j += 1) {
          configName.add(widget.reactions[i]["config"][j].keys.toList()[0]);
        }
      }
    }
    return configName;
  }

  @override
  void dispose() {
    super.dispose();
    for (int i = 0; i < 5; i += 1) {
      controllers[i].dispose();
    }
  }

  void saveConfig(int index) {
    List<String> config = getConfigName();
    if (config.isEmpty) return;
    widget.reaction.config[index] = {config[index]: controllers[index].text};
  }

  List<Widget> showInputs() {
    List<Widget> newWidget = [];
    configName = getConfigName();
    for (int i = 0; i < configName.length; i += 1) {
      newWidget.add(Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Align(
            child: Text(configName[i],
                style: const TextStyle(
                    color: Colors.black,
                    fontSize: 14,
                    fontWeight: FontWeight.w700)),
            alignment: Alignment.topLeft,
          ),
          inputs[i]
        ],
      ));
      newWidget.add(const SizedBox(height: 10));
    }
    return newWidget;
  }

  List<Widget> dropDown() {
    return [
      Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
        const Text(
          "Choose the reaction",
          style: TextStyle(
              color: Colors.black, fontSize: 14, fontWeight: FontWeight.w700),
        ),
        DropdownButton<String>(
            icon: const Icon(
              FontAwesomeIcons.arrowDown,
              size: 15,
              color: Colors.white,
            ),
            style: const TextStyle(color: Colors.black),
            onChanged: (String? newValue) {
              if (newValue == currentreaction) return;
              setState(() {
                currentreaction = newValue!;
              });
              widget.reaction.config = [{}, {}, {}, {}, {}];
              clean();
              widget.reaction.name = newValue!;
            },
            value: currentreaction,
            items: reactionNames.map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList())
      ]),
      const SizedBox(height: 50)
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 25,
        vertical: 50,
      ),
      alignment: Alignment.topLeft,
      decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
                color: Colors.blueGrey.withOpacity(0.5),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3)),
          ],
          color: Colors.white,
          borderRadius: const BorderRadius.all(Radius.circular(5))),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: dropDown() + showInputs(),
      ),
    );
  }
}
