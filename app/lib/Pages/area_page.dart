import 'dart:convert';

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
import 'package:area/API/api.dart';

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
  Future<String> _getData() async {
    final response = await getJobs(host: widget.host, token: widget.user.token);
    return response.body;
  }

  @override
  void initState() {
    super.initState();
  }

  List<Area> parseData(String? data) {
    final json = jsonDecode(data!);
    List<Area> areas = [];
    print(json["job"]);
    int size = json["job"].length;
    for (int i = 0; i < size; i += 1) {
      areas.add(Area.fromJson(json: json["job"][i]));
    }
    return areas;
  }

  void newArea() async {
    var actions = actionFromJson(widget.actionReaction);
    var reactions = reactionFromJson(widget.actionReaction);
    Area result = await showGeneralDialog(
        context: context,
        pageBuilder: (BuildContext context, Animation animation,
            Animation secondAnimation) {
          return Center(
              child: Container(
            width: 400,
            height: 500,
            color: CustomColor.lightBlue,
            child: Scaffold(
                body: Container(
                    // decoration: background(),
                    child: NewArea(
              host: widget.host,
              actions: actions,
              reactions: reactions,
            ))),
          ));
        }) as Area;
    if (result.isError()) return;
    result.clean();
    final response = await createUpdate(
        area: result, host: widget.host, token: widget.user.token);
    print(response.statusCode);
    await Future.delayed(const Duration(seconds: 2), () {});
    setState(() {});
  }

  void delete(String jobToken) async {
    await deleteJob(
        token: widget.user.token, host: widget.host, jobToken: jobToken);
    await Future.delayed(const Duration(seconds: 2), () {});
    setState(() {});
  }

  void stop(String jobToken, bool isRun) async {
    await stopJob(
        token: widget.user.token,
        jobToken: jobToken,
        host: widget.host,
        isRun: isRun);
    await Future.delayed(const Duration(seconds: 2), () {});
    setState(() {});
  }

  List<Widget> getArea(List<Area> areas) {
    int size = areas.length;
    List<Widget> widgets = [];
    for (int i = 0; i < size; i += 1) {
      widgets.add(dismiss(
          widget: Job(
            host: widget.host,
            area: areas[i],
            callback: () => stop(areas[i].token, areas[i].runNow),
          ),
          onDismissed: () => delete(areas[i].token)));
      widgets.add(const SizedBox(height: 10));
    }
    return widgets;
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
                children: [
                  const Text(
                    "AREAS",
                    style: TextStyle(
                        fontSize: 25,
                        color: Colors.white,
                        fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 10),
                  FutureBuilder(
                    future: _getData(),
                    builder:
                        (BuildContext context, AsyncSnapshot<String> snapshot) {
                      if (snapshot.hasData) {
                        List<Area> areas = parseData(snapshot.data);
                        return SingleChildScrollView(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: getArea(areas),
                          ),
                        );
                      } else {
                        return Text("Wait");
                      }
                    },
                  ),
                ],
              ))),
      // child: Column(
      //   mainAxisAlignment: MainAxisAlignment.center,
      //   children: [
      //     dismiss(
      //         widget: Job(host: widget.host, area: area),
      //         onDismissed: () => print("hello")),
      //   ],
      // ))),
      fbutton(onPressed: () => newArea())
    ]));
  }
}
