---
layout: monochrome-default
type: ma-thesis
title: Improving A* Search on Public Transit Graphs - First Take
---
# Motivation
A* Search is an algorithm that uses heuristics to speed up shortest path queries. To make a correct query with A* from $$s$$ to $$t$$  on a Graph $$G=(V, E)$$ we need a heuristic  $$\pi_t(v)$$ that is a lower bound for the real distance to t: $$\forall v\in V:  \pi_t(v) \leq dist(v, t)$$. The better $$\pi_t(v)$$ is (= the bigger the heuristic value is), the better is the speedup. 

On graphs with public transit (Public Transit Graphs, *PTG*) there exist edges for fast connections that only operate a few times a day. This means that depending on the departure time, the travel time of the edge is either very short or very long (if you depart shortly before the train departs, you can take the train, if you depart after the train departed you either have to wait for the next connection or you have to walk). This makes it hard to find good lower bounds of such edges due to their high fluctuation of their travel time.

The main idea of this approach is to identify a set of edges $$L_1 \subset E$$ with a high fluctuation and find a good heuristic for $$\underline{G}=(V, E \setminus L_1)$$ and then somehow have a query algorithm that uses A* in $$\underline{G}$$ and Dijkstra in $$\overline{G}=(V, L_1)$$ ... *or something like that*.

# Assumptions & Conditions
- Given a graph $$G=(V,E)$$
- Given a subset $$L_0 \subset E$$
- Given a subset $$L_1 \subset E$$ with $$L_0 \cap L_1 = \emptyset$$
- and we define $$L_{0,1} = L^*=(E \setminus L_0)\setminus L_1$$

We also call the subsets **layers with level 0 or level 1**

For $$L_0$$ and $$L_1$$ the **layer condition** holds:
> $$\forall \text{ shortest paths } P=(e_0, e_1, \dots , e_k) \text{ }\exists l,k: l \leq k \text{ with}$$
> * $$e_i \in L_0 \cup L^* \quad , i \lt l$$ 
> * $$e_i \in L_1 \cup L^* \quad , l \leq i \lt l$$
> * $$e_i \in L_0 \cup L^* \quad , k \leq i$$

maybe this notation is easier to understand
> $$\forall \text{ shortest paths } P : P = \underline{P_s} + \overline{P} + \underline{P_t} = (e_{0} \,, \dots \,, e_{h})+(E_0, \dots \,, E_k)+(\tilde{e_{0}}\,, \dots \,, \tilde{e_{l}}) \text{ with}$$ 
> * $$e_i \in L_0 \cup L^*$$ 
> * $$\tilde{e_i} \in L_0 \cup L^*$$
> * $$E_i \in L_1 \cup L^*$$
> * $$len(\underline{P_s}, \overline{P}, \underline{P_t} \geq 0)$$

We also set require a heuristic $$\pi_t(v, l)$$:
> * $$\pi_t(v,1) = 0\quad \text{, } \forall v \in V$$
> * $$\pi_t(v,0)$$ is an arbitrary feasible heuristic (definition of feasability as in the VL Routenplanung)

# First Take: The most naive and _Simple PTG-A*_
`Q` is a priority function, `pi(v,l)` is a heuristic function, `d[v]` shortest distance to `v` found
{% highlight cpp linenos%}
Q.clear()
Q.add(s, 0, 0, pi(s,0))
while(!Q.empty()) 
    u, l_max, l_curr, dist = Q.pop()
    for (e=(u,v) : outgoingEdges(u)) 
        if (d[u] + len(e) < d[v]) 
            l_edge = level(e, l_curr)
            // stay in same level
            if (l_curr == l_edge) 
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_curr, d[v] + pi(v, l_edge))
            // ascend to higher level (if it was not visited yet)
            else if (l_curr < l_edge && l_max < l_edge) {
                d[v] = d[u] + len(e)
                Q.update(v, l_edge, l_edge, d[v] + pi(v, l_edge))
            // descend to lower level
            else if (l_curr > l_edge && l_max <= l_curr) {
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_edge, d[v] + pi(v, l_edge))
{% endhighlight %}

The Algorithm is a normal A* search algorithm on edges $$e \in L_0$$ and a normal Dijkstra on edges $$e \in L_1$$. The edges $$e \in L^*$$ are considered as edges from either $$L_0$$ or $$L_1$$ depending on what the current level is.　_Note, that there is no stopping criteria whatsover yet und the current approach will check and try to relax all reachable edges._

# Correctness
Is PTG-A* correct and finds the shortest path from $$s$$ to $$t$$? Intuition says yes.

## Case 1: Shortest path $$P=(e_0, \dots, e_k)$$ with $$e_i \in L_0 \cup L^*$$

As demanded $$\pi_t(v,0)$$ is a feasible heuristic. Therefore, A* will find the correct shortest path in $$P$$ in $$\overline{G}=(V,E_0 \cup E_{0,1})=(V,E\setminus E_1)$$.

## Case 2: Shortest path $$P=\underline{P_s} + \overline{P} = ((s,v_1)=e_0, \dots, e_h=(v_{h-1}, v_h), E_0, \dots, E_k = (v_{k-1}, t))$$ with $$e_i \in L_0 \cup L^*$$ and $$E_i \in L_1 \cup L^*$$

Simple PTG-A* assigns for all vertices the correct shortest distance in $$\overline{G}$$ to $$s$$ because of line `7`:
```
d[v] = d[u] + len(e)
```

As $$P$$ is a shortest Path, the subpath $$\underline{P_s}$$ is also shortest Path. Simple PTG-A* adds vertex $$v_k$$ to the queue with the label $$(v_k, 0, 0, dist(s, e_k))$$. When popping $$v_l$$ from the queue and processing it, we relax edge $$E_0$$ and ascend to `level 1` in line `13`. As heuristic $$\pi_t(v,1) = 0$$, Simple PTG-A* behaves like a normal Dijkstra in $$\overline{G}=(V,E_1 \cup E^*)$$ and will therefore finde $$\overline{P}$$ correctly. 

## Case 3: Shortest path $$P=\underline{P_s} + \overline{P} + \underline{P_t}= ((s,v_1)=e_0, \dots, e_h, E_0, \dots, E_k, \tilde{e_0}, ...  \tilde{e_l}= (v_{l-1}, t))$$ with $$e_i \in L_0 \cup L^*, \tilde{e_i} \in L_0 \cup L^*$$ and $$E_i \in L_1 \cup L^*$$


**@TODO** blablabla

## Korollar something

> Let $$P=(e_0 = (s, v_0), \dots, e_k = (v_{k-1}, t))$$ be a shortest path from $$s$$ to $$t$$. For every vertex $$v_i$$ it is $$key(v_i)\leq key(v_{i+1})$$.

Proof: 
> $$\begin{align}
> key(v_i) & \leq key(v_{i+1})\\
> \Leftrightarrow len(e_0, ..., e_{i}) + \pi_t(v_i) & \leq len(e_0, ..., e_{i}, e_{i+1}) + \pi_t(v_{i+1})\\
> \Leftrightarrow \pi_t(v_i) & \leq len(e_{i+1}) + \pi_t(v_{i+1})\\
> \Leftrightarrow 0 & \leq len(e_{i+1}) - \pi_t(v_i) + \pi_t(v_{i+1})
> \end{align}$$
 
Which is exactly the definition of feasibility of heuristics!

## Second Take: Stopping _PTG-A*_
_Simple PTG-A*_ is basically a mix of a Dijsktra and A* that traverses the whole graph and all its edges. Can we stop the search after relaxing our target $$t$$? Namely, can we add line `5` as follows?

{% highlight cpp linenos%}
Q.clear()
Q.add(s, 0, 0, pi(s,0))
while(!Q.empty()) 
    u, l_max, l_curr, dist = Q.pop()
    if (u == t) break
    for (e=(u,v) : outgoingEdges(u)) 
        if (d[u] + len(e) < d[v]) 
            l_edge = level(e, l_curr)
            // stay in same level
            if (l_curr == l_edge) 
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_curr, d[v] + pi(v, l_edge))
            // ascend to higher level (if it was not visited yet)
            else if (l_curr < l_edge && l_max < l_edge) {
                d[v] = d[u] + len(e)
                Q.update(v, l_edge, l_edge, d[v] + pi(v, l_edge))
            // descend to lower level
            else if (l_curr > l_edge && l_max <= l_curr) {
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_edge, d[v] + pi(v, l_edge))
{% endhighlight %}

We will find a proof by contradiction:

## Case 1: Shortest path $$P=(e_0, \dots, e_k)$$ with $$e_i \in L_0 \cup L^*$$
Let $$\hat{P} \neq P$$ be the shortest path found by _PTA-A*_. If $$\forall e \in \hat{P}: e \in L_0 \cup L^*$$ it is a contradiction to the correctness of A\*. 

Therefore, $$\exists e \in \hat{P} : e \in L_1$$.

