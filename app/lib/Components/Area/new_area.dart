import 'package:area/Components/Common/color.dart';
import 'package:area/Models/area.dart';
import 'package:flutter/material.dart';
import 'package:area/Models/action_list.dart';

class NewArea extends StatefulWidget {
  final String host;
  const NewArea({Key? key, required this.host}) : super(key: key);
  @override
  State<NewArea> createState() => _NewAreaState();
}

class _NewAreaState extends State<NewArea> {
  bool saveState = false;
  int _stepIndex = 0;
  List<String> actionNames = [];
  String actionName = "";

  @override
  void initState() {
    super.initState();

    for (int i = 0; i < actions.length; i += 1) {
      actionNames.add(actions[i]["ActionName"]);
    }
    actionName = actionNames[0];
  }

  List<Step> steps() {
    return [
      Step(
          state: _stepIndex <= 0 ? StepState.editing : StepState.complete,
          isActive: _stepIndex >= 0,
          title: const Text('Action'),
          content: Center(
              child: DropdownButton<String>(
                  onChanged: (String? newValue) {
                    setState(() {
                      actionName = newValue!;
                    });
                  },
                  value: actionName,
                  items:
                      actionNames.map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList()))),
      Step(
          state: _stepIndex <= 1 ? StepState.editing : StepState.complete,
          isActive: _stepIndex >= 1,
          title: const Text('Reaction'),
          content: const Center(child: Text("Reaction"))),
      Step(
          state: _stepIndex <= 2 ? StepState.editing : StepState.complete,
          isActive: _stepIndex >= 2,
          title: const Text('Trigger'),
          content: const Center(child: Text("Trigger")))
    ];
  }

  @override
  Widget build(BuildContext context) {
    void onStepCancel() {
      if (_stepIndex > 0) {
        setState(() {
          _stepIndex -= 1;
        });
      }
    }

    void onStepContinue() {
      if (_stepIndex < steps().length - 1) {
        setState(() {
          _stepIndex += 1;
        });
      }
    }

    void onStepTapped(int index) {
      setState(() {
        _stepIndex = index;
      });
    }

    return Theme(
      data: ThemeData(
          colorScheme: const ColorScheme.light(primary: CustomColor.lightBlue)),
      child: Stepper(
        type: StepperType.horizontal,
        currentStep: _stepIndex,
        onStepCancel: () => onStepCancel(),
        onStepContinue: () => onStepContinue(),
        onStepTapped: (index) => onStepTapped(index),
        steps: steps(),
      ),
    );
  }
}
