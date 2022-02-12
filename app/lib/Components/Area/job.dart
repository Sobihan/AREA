import 'package:area/Components/Area/job_detail.dart';
import 'package:area/Components/Common/rect.dart';
import 'package:area/Components/Common/color.dart';
import 'package:area/Models/area.dart';
import 'package:flutter/material.dart';

class Job extends StatefulWidget {
  final String host;
  final Area area;
  const Job({Key? key, required this.host, required this.area})
      : super(key: key);
  @override
  State<Job> createState() => _JobState();
}

class _JobState extends State<Job> {
  void _more() async {
    var result = await showDialog(
        context: context,
        builder: (_) => Detail(area: widget.area, host: widget.host));
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () => {_more()},
        child: Container(
          alignment: Alignment.center,
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
          height: 100,
          child:
              Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
            const Text(
              "IF",
              style: TextStyle(
                  fontWeight: FontWeight.bold, color: CustomColor.lightBlue),
            ),
            rect(widget.area.action.name, Colors.grey, 100, 40),
            const Text(
              "THEN",
              style: TextStyle(
                  fontWeight: FontWeight.bold, color: CustomColor.darkBlue),
            ),
            rect(widget.area.reaction.name, Colors.grey, 100, 40),
          ]),
        ));
  }
}
