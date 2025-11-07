# Variations

Well, we need an official list and musing on how they would work right? For now I'll suck in the ones from the notebook that seem immediately fun to do, so this is a curation pass. 

## Implemented (at least in part)

- Racer

- Animal Crossing
- Drag
- Freeway
- Ghost
- Gridlock
- One lane road
- OP
- Wrong way

## Racer (Codename: [Racer](../&v=racer))

This is the default. It's still a bit under construction but is essentially a three-lane racer with opponents coming down the screen (because you're faster than them technically) and you have to avoid them with a time-based scoring system.

(Question: do I want lane changes to be tweened? I should try it out. Even a very fast tween might look nice. What about changing lanes mid-tween - get it? Changing horses mid stream? You don't. I mean you don't do it.)

### 2025-10-29

Very late but obviously I have a decent working version up.

## Gridlock (Codename: [Gridlock](./&v=gridlock))

Just fill the entire field with cars that don't move. The player is in there in the usual place but if they move left or right they die (kind of weird to move while stopped? But maybe it's funny to have that little agency?)

### 2025-10-29

Basic thing works. I need to think about whether to have lane changes and how they might work if I did (since they can only reasonably occur while the traffic is actually moving which creates some annoyances? Like what happens if you're partway through a lane change when the traffic stops again for instance.)

### 2025-10-30

More complex thing works. Lane changing at very low speed can happen. If you're partway through the change you just stop and have to keep trying. You can crash. In writing this commit I realized it would be funny to have horns. We need horns.

## Two hour commute

The standard game with a clock counting down the distance. A building on screen somewhere, and a house at the end. Very Desert Bus I suppose. A little animation of a little person getting into the car from the building? An intertistial/"cut-scene"... maybe that's funnier in a weird way? And then it just cuts to the exact usual game... kind of like that.

## One lane road (Codename: [One Lane Road](./&v=onelaneroad))

There's only one lane. Unclear how to handle opponents in this case? I guess they could drift back and match your speed and drift back up again? Just for visual interest? Or just one person in front of you really drifting back and forth but never actually hitting you. No steering involved (can you crash into the side?)

### 2025-10-30

Got the basics going here and it's pretty nice. Solved the questions above with a drifty other car that never hits you + you can move in the lane but never hit the sides.

Just need to work on the visuals a bit, maybe trees along the sides.

## Low speed chase(r) (Codename: [Low Speed Chase](./&v=chase))

Three police cars across the lanes behind you (or six?) and just open road in front of you. Do you eventually run out of gas? It counts down and eventually the whole thing just stops and you get arrested.

The more there are these endings (see two hour commute) the more I'll need a consistent design approach to them. Cut scenes versus texts versus in-game results. I do quite like the idea of really low resolution animations as I haven't done anything like that for ages? Even just like a two frame bouncing thing?

### 2025-11-03

Got the basic version of this working and... well it's visually satisfying at the very least (suddenly thinking I need to change the lane-change tween speed as the player slows down? hhhhhh)

This is one that will kind of need the context of cinematics. Ah yes. Cinematics. Low low res cinematics.

## Drag racer (Codename: [Drag Racer](./&v=drag))

You'd need a specific input to "go" which could be "up" (swipe up) so that would work (opens up questions about changing speed in general? Which... I just don't know how I feel about it tbh). But anyway you need to hit "go" at the right moment and that's it you either win or you don't... or maybe it's worse than that and there's just a huge chance element? 

Parachute comes out, someone is declared a winner. Parachute could be in the ending animation if I'm going all in on that. I can sense it becoming part of the vision.

### 2025-11-02

Basic version is in place and already quite satisfying. As noted in the commit, things to think about adding are

- Parachute in live mode versus a cut scene
- A finish line that passes by (triggering parachute)
- Cars slowing down after the finish line
- Random misfortunes like blowing up at the line, spinning off the track, speed hiccup somewhere during the race

## Track and race

Repeatedly hit "up" to keep your speed up? Otherwise you grind to a halt? What about the problem of the cars behind you? Maybe they zip past you but never into your butt unless you change lanes in front of them at a low speed? Maybe they're ... well it sounds complex, but kind of fun.

## Piano roll

No cars? Just pickups in the three lanes that play a song. We might want eight lanes for an octave? What's a great one octave song?

## You're going the wrong way

Same game but the cars come pointing at you and fast, you inevitably will crash I suppose?

### 2025-10-31

This one basically works. Feels like maybe the opponents should be delayed a bit for it to be funnier? I made the score go down rather than up which I think is a nice touch personally.

## Freeway / n-lane racer (Codename: [Freeway](../&v=freeway))

Well I've already built the first version of that. Open question on making it single pixel scale though... I think it's worth trying.

### 2025-10-29

Late here too, but I do have a working version of this, although I intend to pursue the single-pixel version.

## Ghost racer (Codename: [Ghost](../&v=ghost))

You're a ghost car, can't crash, har har. Oh and there's the idea you *can* switch lanes to left and right and... see something else, some ghostly world outside the game, that would be really neat right? I quite love it... could come into view in a fun way too... actually especially with tweening... hmmm, this is a better one than I'd thought. Reminders obviously of Ghost Pong but also of Jostle Parent.

I see I wrote "get to heaven" as a potential secret objective... heh.

### 2025-10-29

Implementation going well here, but need to make a decision on that question of what there is outside the three lanes. Initial ideas:

- A random deluge of artifacts from the rest of the game pelting down the screen (to continue to give you the sense of motion?)
- Or similarly just some sense of driving through the hidden landscape of this game itself, different scenes and roads with different things happening?
- Other ghost cars, maybe going in all directions? Why though?
- Some sort of more explicit ghosty thing like angel cars or whatever.. I can tell this is stupid though
- Something more ambiguous and abstract ala 2001 light show or something? Representation of the impossible-to-represent afterlife?
- Is it the afterlife or you're a ghost in the world repeating the patterns you knew from before?
- Which points back to the idea of it being a kind of behind the scenes of the game?
- Why is this a bulleted list?

## High Definition

Sub in "awesome graphics" for everything... is that interesting or just stupid though? I can't quite tell if it's worth it, so I should probably prototype it and see.

## Dating Sim

Sounds too complex to me right now, but the idea is crashing starts a "date" where you have conversational options and can maybe pickup and give gifts and... what? Get married at some point? It's sort of funny but currently seems pretty awkward...

## Racer Problem

Trolley Problem version with a succession of trolley problem situations. Funny if it's continuous driving so you run people over and keep going. Some stuff you wouldn't be able to easily do like the loop track.

### 2025-11-07

Ran into a ton of trouble with the implementation of this which... sucks. It's not a complex idea but running into difficulties around linking a text to the rest of the stuff. May need to use a container.

## Street Legal

Dumb name but the idea of things like stop signs and crossings so you have to obey the law. This would mandate speed control unless it's automated (which wouldn't be very interesting unless it would)

## Night Racer

Dark except for headlights up the road. In this context they'd need to overlap the other tracks a little so that you can have a chance of changing lanes. I suppose the other cars would also have lights. I wonder if it gets nightmarish or not? Cars driving with their lights off? I dunno. Odd how confused this sounds given the basic clarify of the idea...

## Drunk Racer

Who is impaired, you or the others? Everyone? Controls flip or delay or trigger without you. This is another one where tweening would make it more expressive so I suppose I'm talking myself into that idea aren't I. You could even manipulate the car to drift around and fix it with lane changing.

## Self Racing Car

The whole thing takes care of its self, getting arbitrarily fast like Zorba. Actual "AI" to do this? Only impressive if it never ever crashes? Or funny if it does... hm

## Carpool Karaoke

The same game but just the extra bits to be able to sing as you drive. MIDI plus the words plus the bouncing ball (which implies timing which is scary). Funny if it's *not* a well known song? Funny if it's My Way or some other classic bombastic karaoke song? How to synchronize?

## Speed Racer

(Good joke, Pips.) You have to maintain a specific speed or the car explodes. Except that requires the idea of speed and maintaining it. Felix was part of this idea as it notes in the notebook. Oddly for a game called Racers there's not actually that much attention to speed here... there's a speed and you dodge at that speed and it increased?

I can add an acceleration idea with "up" and "down" to change it but... I dunno how to represent that almost? How it will feel etc.? I can do it but my brain doesn't instantly say "yeah definitely do that"?

Is there a way of saving the idea then? Not really to the extent the stress was about driving at a speed and not slowing down which is *already* the case. And blowing up is not significantly different to just crashing which is the only way you change speed in the game right now? So...

What... just a cinematic recasting of the way the game already is? That's not unfunny?

This fits in with this whole question of positioning and I note that I'm continuing to imagine some sort of opening and closing cinematic, so that could work as a sort of intensification of play and an explanation of why you have no speed controls in the first place - Judo! (As in I flipped the concept using its own momentum.)

## Roulette Racer

As in "Russian Roulette" where you have some time limit (I suppose) to choose a lane, and then it fires a car down at you way too fast to dodge. Such that the race kind of becomes almost turn based? A bit unclear how scoring/progress works? Presumably you just die at some point and... is that interesting? Or best not to overthink it... prototype the basic structure and then see where the feels lead.

## World Tour

The idea of racing in different locations. Another cinematics opportunity to just establish "oh, now you're in Morocco" "now you're in Slovakia." Included the idea that you go past national borders literally on the track.

But again there's the cinematics opportunity/option here where it sets up that you're racing in a different location (each time you load the game?)? This is again sort of trading on that same Speed idea above of setting contexts to the same actual play (ala SNAKISMS 2).

I can't make that "joke" too many times but it's worth it a couple of times, it's always worth it, that idea is never "solved" right? The idea that context and setup matters?

## ~~Racing Mower~~

You're mowing...? Kinda weak, no?

## Skateboard Racer

The car is a skateboard and you can do kickflips and other tricks. So you can kind of jump up and then spin the car/board in the two directions before you land. Landing tricks, landing tricks over cars, ... sounds kiiind of fun? Up to jump and left/right/up/down to trigger tricks?

Tricks would be announced in some way on screen, sound effect, points, etc. But still also racing. Could end up landing on another car and wiping out. 

Rail slides? Stair sets? Sounds kind of fun... ? A totally linear top down skating experience.

## ~~DDR~~

Can't quite visualize this being good.

## Stunt Racer

You have some sort of specific objective to pull off a stunt. Race past the two cars then crash into the bus, say. Procedural students? I wonder what range of expressivity of stunts we can get into this base game? Do I say "expressivity" too much?

I like the idea of a structured and repeatable sequence though I think there's something there. Weaving through traffic in a specific way, crashing into a particular thing, etc. Maybe even just triggering a big explosion.

## Shit Racer

Because there has to be one. But also as I noted in the notebook I don't know how to do it really. The issue of shit permanence because you're moving forward in the world. It could build up on the front of your car? Cars shit and if you hit the shit it builds up and on you and becomes part of your car?

I mean I can just wrestle shit into the game, right, and it's just there because it has to be? Most obviously the other cars shit and it causes trouble. The trouble would either be you spin out on it, or it accumulates on your car and maybe changes your hitbox?

## Climate Change

A sort of "straightforward" serious game about climate change/pollution through the lens of the racer (cars cause pollution y'know). "Just" various effects that accumulate over time? A pollution fog, a rising water level encroaching on the track, ... something something heat and extreme weather, ... something...

Clearly I don't really understand this. Smog makes the most sense and is easy to think about, the fog of war. Deserves through as I do think it's a fun idea. Water levels are more interesting and make me think of that game (via Robert?) where you could go to the future and see how everything is covered in water.

Maybe stages at different times where it's smoggy, then hurricanes all the time, then just covered in water, ...? Cars visible sunken beneath the water in the apocalypse?

## ~~Smog of War~~

Well that's just a continuation of the above... could be distinguished or not... maybe not that interesting because it doesn't really go anywhere?

## ~~Quantum Racer~~

This was the idea of playing out all possibilities, but without acceleration I don't think there's enough information to both... it would just be ghost cars in each lane and... nothing much else? Can rethink a bit but doesn't sound like it works.

## First Person Racer

I like the idea of this, kind of a model-view-controller thing where I figure out how to represent the same idea in perspective? But it also sounds really stupidly hard and maybe in the end not very rewarding? Unless I play with "first person" a bit more and it's about leaning into the "I"-ness of the first person?

## Silent Movie

Mostly the idea of grainy black and white, a vignette, and interstitial texts that say funny/stupid things mostly drawn aesthetically from, say, Buster Keaton and Charlie Chaplin films? I think I like the idea of it... recasting the game as a sequence from a slapstick comedy?

## Drum Machine / Music Maker

Turn it into a music thing. Move on a grid/sequence and pick up instruments/drum sounds that accumulate into the music? How would this interact with the other cars? They could contribute sounds too actually, drones maybe, according to lane or just car type.

There's probably something to this.

## OP Racer

When you crash the other car goes flies off the screen dramatically, spinning and exploding. Fun and havoc.

### 2025-11-02

Initial version is in place. Works pretty well.

## Wrap Wracer

When you go off the left you come on the right etc. And that's it. Perfectly fine.

## Sheep Crossing

Sheep cross and you have to stop for them. Without speed controls this would have to happen automatically and that is... maybe funnier? Then you CANNOT hit the sheep, you should screech to a halt, they go by, and then you take off again. Pretty good.

## The Open Road

No other cars. Har.

---

Up to rainy day