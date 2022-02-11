import 'package:area/Components/Common/color.dart';
import 'package:area/Models/area.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class NewArea extends StatefulWidget {
  final String host;
  final List<Map<String, dynamic>> actions;
  const NewArea({Key? key, required this.host, required this.actions})
      : super(key: key);
  @override
  State<NewArea> createState() => _NewAreaState();
}

class _NewAreaState extends State<NewArea> {
  List<TextEditingController> controllersAction = [];
  List<Text> actionConfigName = [];
  List<Widget> inputsAction = [];

  List<String> actionNames = [];
  String actionName = "";

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < widget.actions.length; i += 1) {
      actionNames.add(widget.actions[i]["ActionName"]);
    }
    actionName = actionNames[0];
  }

  void cleanData() {
    int sizeAction = controllersAction.length;
    if (sizeAction == 0) return;
    // for (int i = 0; i < sizeAction; i += 1) {
    //   controllersAction[i].dispose();
    // }
    controllersAction = [];
    inputsAction = [];
    actionConfigName = [];
  }

  List<dynamic> getConfig() {
    List<dynamic> config = [];
    for (int i = 0; i < widget.actions.length; i += 1) {
      if (widget.actions[i]["ActionName"] == actionName) {
        config = widget.actions[i]["config"];
        break;
      }
    }
    if (config == []) config;

    for (int i = 0; i < config.length; i += 1) {
      String key = config[i].keys.toList()[0];
      config[i][key] = "";
    }
    return config;
  }

  List<Widget> childrens() {
    cleanData();
    List<Widget> widgets = [
      const SizedBox(height: 10),
      dropdown(),
      const SizedBox(height: 50)
    ];
    List<dynamic> config = getConfig();
    int size = config.length;
    for (int i = 0; i < size; i += 1) {
      String key = config[i].keys.toList()[0];
      actionConfigName.add(Text(key));
      controllersAction.add(TextEditingController(text: config[i][key]));
      inputsAction.add(TextField(
          controller: controllersAction[i],
          style: const TextStyle(color: Colors.white)));
    }
    for (int i = 0; i < size; i += 1) {
      widgets.add(Container(
          height: 50,
          width: MediaQuery.of(context).size.width - 100,
          decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(
                    color: Colors.blueGrey.withOpacity(0.5),
                    spreadRadius: 5,
                    blurRadius: 7,
                    offset: const Offset(0, 3)),
              ],
              color: CustomColor.lightBlue,
              borderRadius: const BorderRadius.all(Radius.circular(5))),
          child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                actionConfigName[i],
                Flexible(child: inputsAction[i])
              ])));
      widgets.add(const SizedBox(height: 10));
    }
    final ButtonStyle style =
        ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 20));
    Widget button = ElevatedButton(
      style: style,
      onPressed: () {
        print(controllersAction[0].text);
      },
      child: const Text('Enabled'),
    );
    widgets.add(button);
    return widgets;
  }

  Container dropdown() {
    return Container(
      height: 50,
      width: MediaQuery.of(context).size.width - 100,
      decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
                color: Colors.blueGrey.withOpacity(0.5),
                spreadRadius: 5,
                blurRadius: 7,
                offset: const Offset(0, 3)),
          ],
          color: CustomColor.lightBlue,
          borderRadius: const BorderRadius.all(Radius.circular(5))),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          const Text(
            "Action:",
            style: TextStyle(color: Colors.white),
          ),
          DropdownButton<String>(
              icon: const Icon(
                FontAwesomeIcons.arrowDown,
                size: 15,
                color: Colors.white,
              ),
              dropdownColor: CustomColor.lightBlue,
              style: const TextStyle(color: Colors.white),
              onChanged: (String? newValue) {
                setState(() {
                  actionName = newValue!;
                });
              },
              value: actionName,
              items: actionNames.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList()),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
        data: ThemeData(
            buttonTheme:
                const ButtonThemeData(textTheme: ButtonTextTheme.accent),
            colorScheme:
                const ColorScheme.light(primary: CustomColor.lightBlue)),
        child: Container(
          width: MediaQuery.of(context).size.width,
          child: Column(children: childrens()),
        ));
  }
}
