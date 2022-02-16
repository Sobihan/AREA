import 'package:area/Components/Common/color.dart';
import 'package:flutter/material.dart';
import 'package:area/Components/Area/input_section.dart';

//ignore: must_be_immutable
class NewTrigger extends StatefulWidget {
  String areaName = "";
  String timer = "5";

  NewTrigger({Key? key}) : super(key: key);

  @override
  _NewTriggerState createState() => _NewTriggerState();
}

class _NewTriggerState extends State<NewTrigger> {
  late TextEditingController _controllerName;
  late TextEditingController _controllerTrigger;

  @override
  void initState() {
    super.initState();
    _controllerName = TextEditingController();
    _controllerTrigger = TextEditingController(text: widget.timer);
    _controllerName.addListener(() => setData(true));
    _controllerTrigger.addListener(() => setData(false));
  }

  void setData(bool name) {
    if (name) {
      widget.areaName = _controllerName.text;
    } else {
      widget.timer = _controllerTrigger.text;
    }
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
        children: [
          const Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Area Name:",
              style: TextStyle(
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 10),
          inputSection(controller: _controllerName),
          const SizedBox(height: 50),
          const Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Timer:",
              style: TextStyle(
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 10),
          inputSection(controller: _controllerTrigger)
        ],
      ),
    );
  }
}
