import 'package:area/Components/Area/new_action.dart';
import 'package:area/Components/Area/new_reaction.dart';
import 'package:area/Components/Area/new_trigger.dart';

import 'package:area/Components/Common/color.dart';
import 'package:area/Models/area.dart';
import 'package:flutter/material.dart';

class NewArea extends StatefulWidget {
  final String host;
  final List<Map<String, dynamic>> actions;
  final List<Map<String, dynamic>> reactions;
  const NewArea(
      {Key? key,
      required this.host,
      required this.actions,
      required this.reactions})
      : super(key: key);
  @override
  State<NewArea> createState() => _NewAreaState();
}

class _NewAreaState extends State<NewArea> {
  late NewAction _newAction;
  late NewReaction _newReaction;
  late NewTrigger _newTrigger;
  int _stepIndex = 0;

  @override
  void initState() {
    super.initState();
    _newAction = NewAction(actions: widget.actions);
    _newReaction = NewReaction(reactions: widget.reactions);
    _newTrigger = NewTrigger();
  }

  bool isNumeric(String str) {
    if (str == "") return true;
    return double.tryParse(str) != null;
  }

  void createArea() {
    if (_newTrigger.areaName == "") return;
    if (isNumeric(_newTrigger.timer) == false) return;

    Area area = Area(
        action: _newAction.action,
        reaction: _newReaction.reaction,
        interval: _newTrigger.timer == "" ? "5" : _newTrigger.timer,
        name: _newTrigger.areaName);
    Navigator.pop(context, area);
  }

  List<String> getActionConfigName() {
    List<String> configName = [];
    for (int i = 0; i < widget.actions.length; i += 1) {
      if (widget.actions[i]["ActionName"] == _newAction.action.name) {
        for (int j = 0; j < widget.actions[i]["config"].length; j += 1) {
          configName.add(widget.actions[i]["config"][j].keys.toList()[0]);
        }
      }
    }
    return configName;
  }

  List<String> getReactionConfigName() {
    List<String> configName = [];
    for (int i = 0; i < widget.reactions.length; i += 1) {
      if (widget.reactions[i]["ReactionName"] == _newReaction.reaction.name) {
        for (int j = 0; j < widget.reactions[i]["config"].length; j += 1) {
          configName.add(widget.reactions[i]["config"][j].keys.toList()[0]);
        }
      }
    }
    return configName;
  }

  bool getLength(List<dynamic> list, List<String> config) {
    int len = 5;
    if (config.isEmpty) return true;
    for (int i = 0; i < list.length; i += 1) {
      if (list[i] == "empty") {
        len -= 1;
      } else if (list[i].values.toList()[0] == "") {
        len += 1;
      }
    }
    if (config.length == len) return true;
    return false;
  }

  bool handleActionError() {
    List<String> config = getActionConfigName();
    if (_newAction.action.name == "") return false;
    return getLength(_newAction.action.config, config);
  }

  bool handleReactionError() {
    List<String> config = getReactionConfigName();
    if (_newReaction.reaction.name == "") return false;
    return getLength(_newReaction.reaction.config, config);
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: ThemeData(
          buttonTheme: const ButtonThemeData(textTheme: ButtonTextTheme.accent),
          colorScheme: const ColorScheme.light(primary: CustomColor.lightBlue)),
      child: Stepper(
          onStepCancel: () {
            Navigator.pop(context, Area.error());
          },
          onStepContinue: () {
            bool isGood = false;
            if (_stepIndex == 2) {
              createArea();
              return;
            }
            if (_stepIndex == 0) {
              isGood = handleActionError();
            } else if (_stepIndex == 1) {
              isGood = handleReactionError();
            }
            if (isGood) {
              setState(() {
                _stepIndex += 1;
              });
              isGood = false;
            }
          },
          type: StepperType.horizontal,
          currentStep: _stepIndex,
          steps: [
            Step(
                isActive: _stepIndex >= 0,
                title: const Text("Action"),
                content: _newAction,
                state:
                    _stepIndex == 0 ? StepState.editing : StepState.complete),
            Step(
                isActive: _stepIndex >= 1,
                title: const Text("Reaction"),
                content: _newReaction,
                state:
                    _stepIndex <= 1 ? StepState.editing : StepState.complete),
            Step(
                isActive: _stepIndex == 2,
                title: const Text("Trigger"),
                content: _newTrigger,
                state: StepState.editing)
          ]),
    );
  }
}
