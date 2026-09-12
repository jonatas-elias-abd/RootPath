import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Network,
  Server,
  Router,
  Laptop,
  Shield,
  Radio,
  Play,
  Terminal,
  Activity,
} from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  ip: string;
  type: 'client' | 'router' | 'firewall' | 'server';
  status: 'online' | 'filtered' | 'target';
  services: string[];
}

const NODES: NetworkNode[] = [
  {
    id: 'node-kali',
    name: 'Sua Máquina (Kali Linux)',
    ip: '192.168.1.105',
    type: 'client',
    status: 'online',
    services: ['SSH (22/tcp)'],
  },
  {
    id: 'node-gw',
    name: 'Gateway / Roteador',
    ip: '192.168.1.1',
    type: 'router',
    status: 'online',
    services: ['DNS (53/udp)', 'HTTP (80/tcp)'],
  },
  {
    id: 'node-fw',
    name: 'Firewall de Borda',
    ip: '10.0.0.1',
    type: 'firewall',
    status: 'filtered',
    services: ['Stateful Inspection'],
  },
  {
    id: 'node-srv',
    name: 'Servidor Alvo (Web + DB)',
    ip: '10.0.0.50',
    type: 'server',
    status: 'target',
    services: ['HTTP (80/tcp)', 'HTTPS (443/tcp)', 'MySQL (3306/tcp)'],
  },
];

export const NetworkTopologyView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NODES[3]);
  const [testLog, setTestLog] = useState<string[]>([]);

  const handlePing = (ip: string) => {
    setTestLog((prev) => [
      ...prev,
      `user@kali:~$ ping -c 2 ${ip}`,
      `PING ${ip} 56(84) bytes of data.`,
      `64 bytes from ${ip}: icmp_seq=1 ttl=64 time=0.42 ms`,
      `--- ${ip} ping statistics: 2 packets transmitted, 2 received, 0% packet loss ---`,
    ]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <Network className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Laboratório de Redes & Topologia Visual
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                Visualizador Gráfico
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Visualize nós, roteadores, firewalls e servidores para compreender tráfego, portas e rotas.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={52} mood="focused" />
      </div>

      {/* Mapa Gráfico de Nós e Conexões */}
      <div className="p-6 bg-layer1 rounded-2xl border border-outline-subtle shadow-surface-card space-y-4">
        <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
          <h2 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
            <Activity className="w-4 h-4 text-secondary-emerald" />
            <span>Topologia da Rede Simulada</span>
          </h2>
          <span className="text-xs font-mono text-on-surface-variant">
            Segmentos: 192.168.1.0/24 e 10.0.0.0/24
          </span>
        </div>

        {/* Diagrama de Nós */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 relative">
          {NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`
                  p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center gap-3 relative
                  ${
                    isSelected
                      ? 'bg-surface-container-high border-primary-electric shadow-glow-primary'
                      : 'bg-surface-container border-outline-subtle hover:border-outline'
                  }
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center border
                    ${
                      node.type === 'client'
                        ? 'bg-primary-electric/15 text-primary-electric border-primary-electric/30'
                        : node.type === 'router'
                        ? 'bg-orange-500/15 text-orange-400 border-orange-500/30'
                        : node.type === 'firewall'
                        ? 'bg-error-container/20 text-error border-error/30'
                        : 'bg-secondary-emerald/15 text-secondary-emerald border-secondary-emerald/30 shadow-glow-secondary'
                    }
                  `}
                >
                  {node.type === 'client' && <Laptop className="w-6 h-6" />}
                  {node.type === 'router' && <Router className="w-6 h-6" />}
                  {node.type === 'firewall' && <Shield className="w-6 h-6" />}
                  {node.type === 'server' && <Server className="w-6 h-6" />}
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-sm text-on-surface">{node.name}</h3>
                  <span className="font-mono text-xs text-primary-electric font-semibold block">
                    {node.ip}
                  </span>
                </div>

                <span
                  className={`
                    text-[10px] font-mono px-2 py-0.5 rounded-full border
                    ${
                      node.status === 'target'
                        ? 'bg-secondary-emerald/10 text-secondary-emerald border-secondary-emerald/30'
                        : 'bg-surface-lowest text-on-surface-variant border-outline-subtle'
                    }
                  `}
                >
                  {node.status === 'target' ? 'Alvo Prático' : node.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Painel de Ações & Terminal Didático de Rede */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Ficha do Nó Selecionado */}
        <div className="p-5 bg-layer1 rounded-2xl border border-outline-subtle flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-on-surface border-b border-outline-subtle pb-2">
              Detalhes do Host: {selectedNode.name}
            </h3>

            <div className="space-y-1.5 text-xs font-mono">
              <div>Endereço IP: <strong className="text-primary-electric">{selectedNode.ip}</strong></div>
              <div>Função no Laboratório: <span className="text-on-surface-variant">{selectedNode.type}</span></div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-xs font-mono font-bold text-on-surface-variant">SERVIÇOS / PORTAS:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.services.map((srv, i) => (
                  <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-container border border-outline-subtle text-secondary-emerald">
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => handlePing(selectedNode.ip)}
            className="w-full py-2.5 bg-primary-electric hover:bg-primary-electric/90 text-white font-mono font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-glow-primary transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Enviar Ping para {selectedNode.ip}
          </button>
        </div>

        {/* Terminal Visual de Resposta de Rede */}
        <div className="flex flex-col bg-terminal rounded-2xl border border-outline-subtle overflow-hidden shadow-surface-card">
          <div className="bg-surface-container px-4 py-2 flex items-center justify-between border-b border-outline-subtle text-xs font-mono text-on-surface-variant">
            <span>Terminal de Rede (kali-network-monitor)</span>
            <Terminal className="w-3.5 h-3.5 text-secondary-emerald" />
          </div>

          <div className="p-4 font-mono text-xs text-on-surface min-h-[160px] space-y-1 overflow-y-auto">
            <div className="text-on-surface-variant">
              # Laboratório de topologia ativo. Clique em 'Enviar Ping' ou inspecione nós.
            </div>
            {testLog.map((line, idx) => (
              <div key={idx} className="text-secondary-emerald">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
