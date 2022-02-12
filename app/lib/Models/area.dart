import 'package:area/Models/action.dart';
import 'package:area/Models/reaction.dart';

class Area {
  final String name;
  final CustomAction action;
  final Reaction reaction;
  final int interval;

  Area(
      {required this.action,
      required this.reaction,
      required this.interval,
      required this.name});

  factory Area.fromJson({required dynamic json}) {
    return Area(
        action: CustomAction.fromJson(json: json["action"]),
        reaction: Reaction.fromJson(json: json["reaction"]),
        interval: json["interval"],
        name: json["name"]);
  }
  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      "name": name,
      "Action": action.toString(),
      "Reaction": reaction.toString(),
      "Interval": interval.toString()
    };
    return data.toString();
  }
}
