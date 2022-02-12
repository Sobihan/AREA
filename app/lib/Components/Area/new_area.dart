import 'package:area/Components/Area/new_action.dart';
import 'package:area/Components/Area/new_reaction.dart';
import 'package:area/Components/Common/color.dart';
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
  int _stepIndex = 0;

  @override
  void initState() {
    super.initState();
    _newAction = NewAction(actions: widget.actions);
    _newReaction = NewReaction(reactions: widget.reactions);
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: ThemeData(
          buttonTheme: const ButtonThemeData(textTheme: ButtonTextTheme.accent),
          colorScheme: const ColorScheme.light(primary: CustomColor.lightBlue)),
      child: Stepper(
          onStepCancel: () {
            Navigator.pop(context, "Cancel");
          },
          onStepContinue: () {
            if (_stepIndex < 2) {
              setState(() {
                _stepIndex += 1;
              });
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
                content: Container(),
                state: StepState.editing)
          ]),
    );
  }
}
